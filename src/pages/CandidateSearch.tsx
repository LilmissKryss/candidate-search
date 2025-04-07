import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import { FaPlus, FaMinus } from "react-icons/fa";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [candidates, setCandidates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState<boolean>(false);

  // Load saved candidates from localStorage
  useEffect(() => {
    const savedCandidates = localStorage.getItem("savedCandidates");
    if (savedCandidates) {
      try {
        const parsedCandidates = JSON.parse(savedCandidates);
        if (Array.isArray(parsedCandidates)) {
          setCandidates(parsedCandidates);
        }
      } catch (error) {
        console.error("Error parsing saved candidates:", error);
      }
    }
  }, []);

  // Fetch a new candidate
  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const users = await searchGithub();
      if (users && users.length > 0) {
        // Find a user that hasn't been saved yet
        let foundNewCandidate = false;
        for (const user of users) {
          if (!candidates.includes(user.login)) {
            const detailedUser = await searchGithubUser(user.login);
            setCurrentCandidate(detailedUser);
            foundNewCandidate = true;
            break;
          }
        }

        if (!foundNewCandidate) {
          setNoMoreCandidates(true);
          setCurrentCandidate(null);
        }
      } else {
        setNoMoreCandidates(true);
        setCurrentCandidate(null);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setNoMoreCandidates(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save candidate and fetch next
  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...candidates, currentCandidate.login];
      setCandidates(updatedCandidates);
      localStorage.setItem(
        "savedCandidates",
        JSON.stringify(updatedCandidates)
      );

      // Save full candidate data
      const savedCandidatesData = JSON.parse(
        localStorage.getItem("savedCandidatesData") || "{}"
      );
      savedCandidatesData[currentCandidate.login] = currentCandidate;
      localStorage.setItem(
        "savedCandidatesData",
        JSON.stringify(savedCandidatesData)
      );

      fetchCandidate();
    }
  };

  // Skip candidate and fetch next
  const skipCandidate = () => {
    fetchCandidate();
  };

  if (loading) {
    return <h2>Loading candidate...</h2>;
  }

  if (noMoreCandidates) {
    return (
      <div className="candidate-container">
        <h2>No more candidates available</h2>
        <p>You've reviewed all available candidates.</p>
      </div>
    );
  }

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>

      {currentCandidate && (
        <div className="candidate-card">
          <img
            src={currentCandidate.avatar_url}
            alt={`${currentCandidate.login}'s avatar`}
            className="candidate-avatar"
          />
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <div className="candidate-info">
            <p>
              <strong>Location:</strong>{" "}
              {currentCandidate.location || "Not specified"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentCandidate.email ? (
                <a href={`mailto:${currentCandidate.email}`}>
                  {currentCandidate.email}
                </a>
              ) : (
                "Not specified"
              )}
            </p>
            <p>
              <strong>Company:</strong>{" "}
              {currentCandidate.company || "Not specified"}
            </p>
            <p>
              <strong>Bio:</strong> {currentCandidate.bio || "Not specified"}
            </p>
          </div>

          <div className="candidate-actions">
            <button onClick={skipCandidate} className="btn-skip">
              <FaMinus />
            </button>
            <button onClick={saveCandidate} className="btn-save">
              <FaPlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
