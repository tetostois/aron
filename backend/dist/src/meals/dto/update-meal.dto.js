"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMealDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_meal_dto_1 = require("./create-meal.dto");
class UpdateMealDto extends (0, mapped_types_1.PartialType)(create_meal_dto_1.CreateMealDto) {
}
exports.UpdateMealDto = UpdateMealDto;
//# sourceMappingURL=update-meal.dto.js.map