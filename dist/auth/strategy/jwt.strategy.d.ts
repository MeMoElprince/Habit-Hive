import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        id: number;
        joinedAt: Date;
        createdAt: Date;
        updateAt: Date;
        name: string;
        email: string;
        hash: string;
        bio: string | null;
        facebookLink: string | null;
        twitterLink: string | null;
        otp: string | null;
        numberOfBadges: number | null;
    }>;
}
export {};
