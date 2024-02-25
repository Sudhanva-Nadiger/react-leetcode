import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import type { Props } from "../../components/userProfileDetails/UserProfileDetails";
import { UserProfileDetails } from "../..";

const baseProps: Props  = {
    userName: "sudhanva_nadiger__",
    theme: {
        primaryColor: "blue",
        secondaryColor: "white",
        bgColor: "red"
    },
}

describe("Tests for user profile details", () => {
    it("should render the user profile details", async () => {
        const { container } = render(<UserProfileDetails {...baseProps} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const userProfileDetails = container.querySelector("#user_profile_detail_container");
            expect(userProfileDetails).toBeInTheDocument();

            const userMainContent = container.querySelector("#user_main_content");
            expect(userMainContent).toBeInTheDocument();

            const userAvatar = container.querySelector("#user_avatar");
            expect(userAvatar).toBeInTheDocument();

            const userNameAndRankContainer = container.querySelector("#user_name_and_rank_container");
            expect(userNameAndRankContainer).toBeInTheDocument();

            const userName = screen.getByText(baseProps.userName);
            expect(userName).toBeInTheDocument();

            expect(userName.innerHTML).toBe(baseProps.userName);

            const userRealName = container.querySelector("#user_real_name");
            expect(userRealName).toBeInTheDocument();

            const miscDetails = container.querySelector("#user_misc_details");
            expect(miscDetails).toBeInTheDocument();
        }, {timeout: 5000})
    })

    it("should render school if given hide flag", async () => {
        const props: Props = {
            ...baseProps,
           hideSchool: true
        }
        const { container } = render(<UserProfileDetails {...props} />);

        const loadingContainer = container.querySelector("#loading_container");
        expect(loadingContainer).toBeInTheDocument();

        await waitFor(() => {
            const userProfileDetails = container.querySelector("#user_profile_detail_container");
            expect(userProfileDetails).toBeInTheDocument();

            const miscDetails = container.querySelector("#user_misc_details");
            expect(miscDetails).toBeInTheDocument();

            const school = container.querySelector("#user_school");
            expect(school).not.toBeInTheDocument();
        }, {timeout: 5000})
    })
})