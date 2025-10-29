from uuid import UUID
from typing import List, Optional
from pydantic import BaseModel, Field


class JobUploadRequest(BaseModel):
    job_descriptions: List[str] = Field(
        ..., description="List of job descriptions in markdown format"
    )
    resume_id: Optional[UUID] = Field(..., description="UUID reference to the resume")
