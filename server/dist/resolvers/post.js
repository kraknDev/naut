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
exports.ThoughtResolver = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let newThoughtData = class newThoughtData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", String)
], newThoughtData.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], newThoughtData.prototype, "ownerId", void 0);
newThoughtData = __decorate([
    (0, type_graphql_1.ArgsType)()
], newThoughtData);
let updateThoughtData = class updateThoughtData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", String)
], updateThoughtData.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], updateThoughtData.prototype, "idThought", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], updateThoughtData.prototype, "ownerId", void 0);
updateThoughtData = __decorate([
    (0, type_graphql_1.ArgsType)()
], updateThoughtData);
let Thought = class Thought {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Number)
], Thought.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Thought.prototype, "ownerId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Thought.prototype, "text", void 0);
Thought = __decorate([
    (0, type_graphql_1.ObjectType)()
], Thought);
let ThoughtResolver = class ThoughtResolver {
    UpdateThought({ ownerId, idThought, text }, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.update({
                    where: {
                        id: ownerId
                    },
                    data: {
                        thoughts: {
                            update: {
                                where: {
                                    id: idThought
                                },
                                data: {
                                    text: text
                                }
                            }
                        }
                    }
                });
                return true;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    queryManyThoughts({ prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield prisma.thought.findMany({
                    take: 10
                });
                return thought;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    queryThought(id, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield prisma.thought.findUnique({
                    where: {
                        id
                    }
                });
                return thought;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    addThought({ text, ownerId }, { prisma }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.update({
                    where: {
                        id: ownerId
                    },
                    data: {
                        thoughts: {
                            create: {
                                text
                            }
                        }
                    },
                });
                return true;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    deleteThought(id, { prisma }) {
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
                return null;
            }
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateThoughtData, Object]),
    __metadata("design:returntype", Promise)
], ThoughtResolver.prototype, "UpdateThought", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Thought], { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThoughtResolver.prototype, "queryManyThoughts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Thought, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThoughtResolver.prototype, "queryThought", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newThoughtData, Object]),
    __metadata("design:returntype", Promise)
], ThoughtResolver.prototype, "addThought", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThoughtResolver.prototype, "deleteThought", null);
ThoughtResolver = __decorate([
    (0, type_graphql_1.Resolver)(Thought)
], ThoughtResolver);
exports.ThoughtResolver = ThoughtResolver;
//# sourceMappingURL=post.js.map