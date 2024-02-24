import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'

import { UserContestInfo } from "../..";
import { Props } from "../../components/heatMap/HeatMap";

const baseProps: Props = {
    userName: "sudhanva_nadiger__",
    theme: {
        primaryColor: "blue",
        secondaryColor: "white",
        bgColor: "red"
    }
}

describe("Tests for user contest info component", () => {
    it("should render the user contest info", async () => {
        const { container } = render(<UserContestInfo {...baseProps} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const contestInfoContainer = container.querySelector("#user_contest_info_container");
            expect(contestInfoContainer).toBeInTheDocument();

            const overAllContestData = container.querySelector("#overall_contest_info_container");
            expect(overAllContestData).toBeInTheDocument();

            const dynamicContestData = container.querySelector("#particular_contest_detail_container");
            expect(dynamicContestData).not.toBeInTheDocument();

            const contestGraph = container.querySelector("#line_chart_container");
            expect(contestGraph).toBeInTheDocument();
        }, { timeout: 5000 })
    })

    it("should render the dynamic contest data when clicked on the graph", async () => {
        const { container } = render(<UserContestInfo {...baseProps} />);

        await waitFor(async () => {
            const contestGraph = container.querySelector("#line_chart_container");
            expect(contestGraph).toBeInTheDocument();

            const firstPoint = container.querySelector("#point_0");
            expect(firstPoint).toBeInTheDocument();

            userEvent.hover(firstPoint as HTMLElement);

            await waitFor(() => {
                const dynamicContestData = container.querySelector("#particular_contest_detail_container");
                expect(dynamicContestData).toBeInTheDocument();

                const overAllContestData = container.querySelector("#overall_contest_info_container");
                expect(overAllContestData).not.toBeInTheDocument();
            }, { timeout: 5000 })
        }, { timeout: 5000 })
    })
})