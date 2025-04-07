import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import {
  FaMinus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
} from "react-icons/fa";

type SortField = "name" | "location" | "email" | "company" | "bio";
type SortDirection = "asc" | "desc";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [displayedCandidates, setDisplayedCandidates] = useState<Candidate[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterText, setFilterText] = useState<string>("");

  // Sort candidates based on field and direction
  const sortCandidates = (
    candidates: Candidate[],
    field: SortField | null,
    direction: SortDirection
  ) => {
    if (!field) return [...candidates];

    return [...candidates].sort((a, b) => {
      let valueA: string | null = "";
      let valueB: string | null = "";

      // Get the values to compare based on the field
      switch (field) {
        case "name":
          valueA = a.name || a.login;
          valueB = b.name || b.login;
          break;
        case "location":
          valueA = a.location;
          valueB = b.location;
          break;
        case "email":
          valueA = a.email;
          valueB = b.email;
          break;
        case "company":
          valueA = a.company;
          valueB = b.company;
          break;
        case "bio":
          valueA = a.bio;
          valueB = b.bio;
          break;
      }

      // Handle null values
      if (valueA === null && valueB === null) return 0;
      if (valueA === null) return direction === "asc" ? 1 : -1;
      if (valueB === null) return direction === "asc" ? -1 : 1;

      // Compare the values
      const comparison = valueA.localeCompare(valueB);
      return direction === "asc" ? comparison : -comparison;
    });
  };

  // Filter candidates based on search text
  const filterCandidates = (candidates: Candidate[], searchText: string) => {
    if (!searchText) return candidates;

    const lowerCaseSearch = searchText.toLowerCase();
    return candidates.filter((candidate) => {
      return (
        candidate.name?.toLowerCase().includes(lowerCaseSearch) ||
        false ||
        candidate.login.toLowerCase().includes(lowerCaseSearch) ||
        candidate.location?.toLowerCase().includes(lowerCaseSearch) ||
        false ||
        candidate.email?.toLowerCase().includes(lowerCaseSearch) ||
        false ||
        candidate.company?.toLowerCase().includes(lowerCaseSearch) ||
        false ||
        candidate.bio?.toLowerCase().includes(lowerCaseSearch) ||
        false
      );
    });
  };

  // Handle column header click for sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If already sorting by this field, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new field, set it and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon based on current sort state
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  // Load saved candidates from localStorage
  useEffect(() => {
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

  // Update displayed candidates when sort or filter changes
  useEffect(() => {
    const sorted = sortCandidates(savedCandidates, sortField, sortDirection);
    const filtered = filterCandidates(sorted, filterText);
    setDisplayedCandidates(filtered);
  }, [savedCandidates, sortField, sortDirection, filterText]);

  // Remove a candidate from the saved list
  const removeCandidate = (username: string) => {
    // Filter out the candidate from the saved list
    const updatedCandidates = savedCandidates.filter(
      (c) => c.login !== username
    );
    setSavedCandidates(updatedCandidates);

    // Update localStorage
    const savedList = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    const updatedList = savedList.filter((name: string) => name !== username);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedList));
  };

  if (loading) {
    return <h2>Loading saved candidates...</h2>;
  }

  return (
    <div className="saved-candidates-container">
      <div className="header-container">
        <h1>Potential Candidates</h1>
      </div>
      <div className="filter-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {savedCandidates.length === 0 ? (
        <div className="no-candidates">
          <p>No candidates have been accepted yet.</p>
        </div>
      ) : (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th
                onClick={() => handleSort("name")}
                className="sortable-header"
              >
                Name {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleSort("location")}
                className="sortable-header"
              >
                Location {getSortIcon("location")}
              </th>
              <th
                onClick={() => handleSort("email")}
                className="sortable-header"
              >
                Email {getSortIcon("email")}
              </th>
              <th
                onClick={() => handleSort("company")}
                className="sortable-header"
              >
                Company {getSortIcon("company")}
              </th>
              <th onClick={() => handleSort("bio")} className="sortable-header">
                Bio {getSortIcon("bio")}
              </th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {displayedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="image-cell">
                  <img
                    src={candidate.avatar_url}
                    alt={`${candidate.login}'s avatar`}
                    className="table-avatar"
                  />
                </td>
                <td>
                  <div className="candidate-name">
                    {candidate.name || candidate.login}
                  </div>
                  <div className="candidate-username">({candidate.login})</div>
                </td>
                <td>{candidate.location || "Not specified"}</td>
                <td>
                  {candidate.email ? (
                    <a
                      href={`mailto:${candidate.email}`}
                      className="email-link"
                    >
                      {candidate.email}
                    </a>
                  ) : (
                    "Not specified"
                  )}
                </td>
                <td>{candidate.company || "Not specified"}</td>
                <td>{candidate.bio || "Not specified"}</td>
                <td>
                  <button
                    className="reject-btn"
                    onClick={() => removeCandidate(candidate.login)}
                  >
                    <FaMinus size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
