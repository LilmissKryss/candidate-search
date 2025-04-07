import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load saved candidates from localStorage
    const loadSavedCandidates = () => {
      setLoading(true);
      try {
        const savedCandidatesList = localStorage.getItem("savedCandidates");
        const savedCandidatesData = localStorage.getItem("savedCandidatesData");

        if (savedCandidatesList && savedCandidatesData) {
          const candidatesList = JSON.parse(savedCandidatesList) as string[];
          const candidatesData = JSON.parse(savedCandidatesData) as Record<
            string,
            Candidate
          >;

          // Map the usernames to their full data
          const candidates = candidatesList
            .map((username) => candidatesData[username])
            .filter((candidate) => candidate !== undefined);

          setSavedCandidates(candidates);
        }
      } catch (error) {
        console.error("Error loading saved candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedCandidates();
  }, []);

  if (loading) {
    return <h2>Loading saved candidates...</h2>;
  }

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <div className="no-candidates">
          <p>No candidates have been accepted yet.</p>
        </div>
      ) : (
        <div className="candidates-list">
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <img
                src={candidate.avatar_url}
                alt={`${candidate.login}'s avatar`}
                className="candidate-avatar"
              />
              <h2>{candidate.name || candidate.login}</h2>
              <div className="candidate-info">
                <p>
                  <strong>Location:</strong>{" "}
                  {candidate.location || "Not specified"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    "Not specified"
                  )}
                </p>
                <p>
                  <strong>Company:</strong>{" "}
                  {candidate.company || "Not specified"}
                </p>
                <p>
                  <strong>Bio:</strong> {candidate.bio || "Not specified"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
