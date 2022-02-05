import * as mongoose from 'mongoose';
import { SurveyType } from '../interfaces/survey.interface';
const surveySchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    lastUpdatedAt: Date,
    createdBy: String,
    createdByID: String,
    skipIntro: Boolean,
    timeLimit: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: [SurveyType.sequential, SurveyType.smart],
        default: SurveyType.sequential
    },
    promptsIDs: mongoose.SchemaTypes.Mixed
});
const surveyModel = mongoose.model('Survey', surveySchema);
export default surveyModel;
//# sourceMappingURL=survey.model.js.map