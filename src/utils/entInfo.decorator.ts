import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const EntInfo = createParamDecorator(
    // ExecutionContext : 현재 요청의 사용자 정보를 추출하는 역할
    (data: unknown, ctx: ExecutionContext) => {
      // http 요청 객체를 가져와서
      const request = ctx.switchToHttp().getRequest();
      // ent 속성 반환. ent가 존재하지 않는다면 null 반환
      console.log("asdsaasas", request) // 아니 왜 ent가 user로 둔갑??
      return request.user ? request.user : null;
    },
  );