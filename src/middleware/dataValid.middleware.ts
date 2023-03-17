import { NextFunction, Response, Request } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { BODY_EMPTY, OPTIONAL_KEYS_MISSING } from "../constraints/messages";

export function dataValid(schema: ZodTypeAny, arrKeys: string[] = []) {
    return function(req: Request, res: Response, next: NextFunction): void {
        if (!Object.keys(req.body).length) throw new AppError(BODY_EMPTY, 400);

        const validatedData = schema.parse(req.body);

        if (!Object.keys(validatedData).length) throw new AppError(OPTIONAL_KEYS_MISSING + arrKeys, 400);

        req.body = validatedData;
        
        return next();
    }
}