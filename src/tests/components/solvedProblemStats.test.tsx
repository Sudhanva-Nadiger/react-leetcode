import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'

import type { Props } from "../../components/solvedProblemsStat/SolvedProblemsStats";
import { UserSolvedProblemsStats } from "../..";
import OverallProgress from "../../components/solvedProblemsStat/OverallProgress";

const baseProps: Props  = {
    userName: "sudhanva_nadiger__",
    theme: {
        primaryColor: "blue",
        secondaryColor: "white",
        bgColor: "red"
    },
    showUserName: false
}

describe("Tests for user solved problem stats", () => {
    it("should render the user stats", async () => {
        const { container } = render(<UserSolvedProblemsStats {...baseProps} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const solvedProblemsStat = container.querySelector("#solved_problems_stats_container");
            expect(solvedProblemsStat).toBeInTheDocument();

            const statsLabel = container.querySelector("#solved_problems_stats_label");
            expect(statsLabel).toBeInTheDocument();

            const testLabel = screen.getByText("Solved Problems");
            expect(testLabel).toBeInTheDocument();

            const userName = screen.queryByText(baseProps.userName);
            expect(userName).not.toBeInTheDocument();

            const progressDetailsContainer = container.querySelector("#solved_problems_stats_progress_deails");
            expect(progressDetailsContainer).toBeInTheDocument();

            const circularProgress = container.querySelector("#circular_progress_container");
            expect(circularProgress).toBeInTheDocument();

            const linearProgress = container.querySelector("#linear_progress_container");
            expect(linearProgress).toBeInTheDocument();

            const progressBars = container.querySelectorAll(".progress_bar");
            expect(progressBars).toHaveLength(3);
        }, {timeout: 5000})
    })

    it("should render username", async () => {
        const props: Props = {
            ...baseProps,
           showUserName: true
        }
        const { container } = render(<UserSolvedProblemsStats {...props} />);
        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const solvedProblemsStat = container.querySelector("#solved_problems_stats_container");
            expect(solvedProblemsStat).toBeInTheDocument();

            const statsLabel = container.querySelector("#solved_problems_stats_label");
            expect(statsLabel).toBeInTheDocument();

            const testLabel = screen.queryByText("Solved Problems");
            expect(testLabel).not.toBeInTheDocument();

            const userName = screen.queryByText(baseProps.userName);
            expect(userName).toBeInTheDocument();
        }, {timeout: 5000})
    })
})

describe("Tests for circular progress", () => {
    it("should render the circular progress", async () => {
        const props = {
            totalQuestions: 200,
            totalSolved: 50,
            primaryColor: "blue"
        }
        const { container } = render(<OverallProgress {...props} />);

        const circularProgress = container.querySelector("#circular_progress_container");
        expect(circularProgress).toBeInTheDocument();

        const baseCircle = container.querySelector("#base_circle");
        expect(baseCircle).toBeInTheDocument();

        const progressCircle = container.querySelector("#progress_circle");
        expect(progressCircle).toBeInTheDocument();

        const progressPercentage = container.querySelector("#progress_percentage");
        expect(progressPercentage).toBeInTheDocument();

        const progressLabel = container.querySelector("#progress_label");
        expect(progressLabel).toBeInTheDocument();

        userEvent.hover(circularProgress!);
        await waitFor(() => {
            const totalSolved = screen.queryByText("50");
            expect(totalSolved).not.toBeInTheDocument();

            const percentage = screen.queryByText("25");
            expect(percentage).toBeInTheDocument();
        }, {timeout: 5000})
    })
})