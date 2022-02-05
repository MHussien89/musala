import UnitService from '../services/unit.service';
class FeaturedUnitsController {
    constructor() {
        this.unitService = new UnitService();
        this.getUnits = async (req, res, next) => {
            try {
                const featuredUnitResponseDTO = await this.unitService.getAvailableRooms();
                const httpResponse = {
                    status: true,
                    data: featuredUnitResponseDTO,
                    count: featuredUnitResponseDTO.length,
                    total: featuredUnitResponseDTO.length
                };
                res.status(200).json(httpResponse);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default FeaturedUnitsController;
//# sourceMappingURL=featuredUnits.controller.js.map