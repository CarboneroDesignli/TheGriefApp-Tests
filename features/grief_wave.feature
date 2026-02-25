Feature: Grief Wave Activity

    @smoke
    Scenario: Complete 1‑minute wave with extension
        Given I am logged in and on the Home screen
        When I start a Grief Wave and run the full flow
        Then I should see the gratitude message
        And I go back to the home screen

    @smoke
    Scenario: Stop the wave early and verify completion message
        Given I am logged in and on the Home screen
        When I start a Grief Wave and stop after a short time
        Then I should see the gratitude message
