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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const class_validator_1 = require("class-validator");
const argon2_1 = require("argon2");
const type_graphql_1 = require("type-graphql");
let newUserData = class newUserData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", String)
], newUserData.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(35),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], newUserData.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Min)(8),
    (0, class_validator_1.Max)(40),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], newUserData.prototype, "password", void 0);
newUserData = __decorate([
    (0, type_graphql_1.ArgsType)()
], newUserData);
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "hashedPassword", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
let UserResolver = class UserResolver {
    queryUser(id, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        id
                    }
                });
                return user;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    addUser({ userName, email, password }, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.create({
                    data: {
                        userName,
                        email,
                        hashedPassword: yield (0, argon2_1.hash)(password)
                    }
                });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    deleteUser(id, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.delete({
                    where: {
                        id,
                    }
                });
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "queryUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newUserData, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map