import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";

import { UserHeatMap } from "../..";
import { Props } from "../../components/heatMap/HeatMap";

const baseProps: Props = {
    userName: "sudhanva_nadiger__",
    theme: {
        primaryColor: "blue",
        secondaryColor: "white",
        bgColor: "red"
    }
}

describe("Tests for user heat map component", () => {
    it("should render the user heat map", async () => {
        const { container } = render(<UserHeatMap {...baseProps} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const heatMapContainer = container.querySelector("#heat_map_container");
            expect(heatMapContainer).toBeInTheDocument();

            const heatMap = container.querySelector("#heat_map");
            expect(heatMap).toBeInTheDocument();

            const rangeLabels = container.querySelector("#heat_map_date_range");
            expect(rangeLabels).toBeInTheDocument();

            const blocks = container.querySelectorAll(".sq-block");
            expect(blocks).toHaveLength(364);
        }, {timeout: 5000})
    })
})