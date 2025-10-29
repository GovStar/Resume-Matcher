from app.models.base import Base
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, text


class JobResumeScore(Base):
    __tablename__ = "job_resume_scores"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, ForeignKey("jobs.job_id"), nullable=False)
    resume_id = Column(String, ForeignKey("resumes.resume_id"), nullable=False)
    score = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"), nullable=False)