"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prismaService, config, jwt) {
        this.prismaService = prismaService;
        this.config = config;
        this.jwt = jwt;
    }
    async login(authDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDto.email
            }
        });
        if (!user) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const valid = await argon2.verify(user.hash, authDto.password);
        if (!valid) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const access_token = await this.signToken(user.id, user.email);
        return { access_token };
    }
    async signup(userDto) {
        try {
            const hash = await argon2.hash(userDto.password);
            delete userDto.password;
            const user = await this.prismaService.user.create({
                data: {
                    ...userDto,
                    hash
                }
            });
            const access_token = await this.signToken(user.id, user.email);
            return { access_token };
        }
        catch (err) {
            if (err instanceof library_1.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials already taken on ' + err.meta.target);
                }
            }
            throw err;
        }
    }
    signToken(userId, email) {
        const payload = {
            sub: userId,
            email
        };
        return this.jwt.signAsync(payload, {
            expiresIn: '16m',
            secret: this.config.get('JWT_SECRET')
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map