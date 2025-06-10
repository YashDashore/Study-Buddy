import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StudyProgress } from "../models/StudyProgress.model.js";

const createStudySession = AsyncHandler(async (req, res) => {
    const { Subject, Total_topics, Covered_topics } = req.body;
    const user_Id = req.user?._id;
    if (!Subject || isNaN(Total_topics) || isNaN(Covered_topics))
        throw new ApiError(400, "All fields are required")
    if (Total_topics <= 0)
        throw new ApiError(400, "Total topic must be a positive number")
    if (Covered_topics > Total_topics)
        throw new ApiError(400, "Covered topics must be equal or less than the total topics")
    const stat = Covered_topics === Total_topics ? "Completed" : "In-progress"
    const rem = Total_topics - Covered_topics
    const per = (Covered_topics / Total_topics) * 100;
    const StudySession = await StudyProgress.create({
        Subject,
        User: user_Id,
        Total_topics,
        Covered_topics,
        Remaining_topics: rem,
        PercentageProgress: per,
        status: stat
    })
    if (!StudySession)
        throw new ApiError(401, "Session cannot be created");
    return res.status(200)
        .json(new ApiResponse(200, StudySession, "Session successfully created"))
})

const UpdateStudySession = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const SSID = req.params.id;

    if (!SSID) {
        throw new ApiError(400, "Study Session ID is required");
    }

    const { Subject, Covered_topics, Total_topics } = req.body;

    const existingSession = await StudyProgress.findOne({ _id: SSID, User: userId });
    if (!existingSession) {
        throw new ApiError(404, "Study session not found");
    }

    const total = Total_topics ?? existingSession.Total_topics;
    const covered = Covered_topics ?? existingSession.Covered_topics;

    if (covered > total) {
        throw new ApiError(400, "Covered topics cannot exceed total topics");
    }

    if (Subject) {
        existingSession.Subject = Subject;
    }

    existingSession.Total_topics = total;
    existingSession.Covered_topics = covered;
    existingSession.Remaining_topics = total - covered;
    existingSession.PercentageProgress = ((covered / total) * 100);
    existingSession.status = covered >= total ? "Completed" : "In-progress";

    await existingSession.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, existingSession, "Study session updated successfully")
    );
});

const getSingleSession = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const Session_id = req.params.id;
    const Session = await StudyProgress.findOne({ User: user_Id, _id: Session_id })
    if (!Session)
        throw new ApiError(400, "Session not found")
    return res.status(200)
        .json(new ApiResponse(200, Session, "Session Details"))
})

const deleteSession = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const SessionId = req.params.id;
    if (!SessionId)
        throw new ApiError(400, "SessionId not found");
    const Session = await StudyProgress.findOneAndDelete({ User: userId, _id: SessionId })
    if (!Session)
        throw new ApiError(404, "Session not found")
    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Session deleted")
        )
})

const getAllSession = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const AllSession = await StudyProgress.find({ User: user_Id })
    if (!AllSession)
        throw new ApiError(401, "Sessions couldn't fetch")
    return res.status(200)
        .json(new ApiResponse(200, AllSession, "Successfully fetched all Sessions"))
})

export { createStudySession, UpdateStudySession, deleteSession, getSingleSession, getAllSession }