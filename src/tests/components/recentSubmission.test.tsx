import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";

import { UserRecentSubmission } from "../..";
import { Props } from "../../components/recentSubmissions/recentSubmission";

const baseProps: Props = {
    userName: "sudhanva_nadiger__",
    theme: {
        primaryColor: "blue",
        secondaryColor: "white",
        bgColor: "red"
    }
}

describe("Tests for recent submission component", () => {
    it("should render the recent submissions", async () => {
        const { container } = render(<UserRecentSubmission {...baseProps} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const recentSubmissionContainer = container.querySelector("#recent-submissions_container");
            expect(recentSubmissionContainer).toBeInTheDocument();

            const recentSubmissionList = container.querySelector("#recent-submissions_list");
            expect(recentSubmissionList).toBeInTheDocument();

            const recentSubmissions = container.querySelectorAll(".recent_submission_tile");
            expect(recentSubmissions).toHaveLength(10);
        }, {timeout: 5000})
    })
})