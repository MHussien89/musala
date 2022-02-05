import UnitService from '../services/unit.service';
class UnitTypesController {
    constructor() {
        this.unitService = new UnitService();
        this.getUnitTypes = async (req, res, next) => {
            try {
                const unitTypes = await this.unitService.getUnitTypes();
                const httpResponse = {
                    status: true,
                    data: unitTypes,
                    count: unitTypes.length,
                    total: unitTypes.length
                };
                res.status(200).json(httpResponse);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default UnitTypesController;
//# sourceMappingURL=unitTypes.controller.js.map