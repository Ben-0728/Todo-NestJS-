import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const decoded = this.jwtService.verify(token);
            req.query.userId = decoded.sub;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
  }
}
