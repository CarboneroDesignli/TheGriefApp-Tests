Feature: Good Moments Management

    @smoke
    Scenario: Create a valid good moment entry with image and text
        # These only run now, at the start of the first test
        Given I am logged in and on the Home screen
        And I navigate to the Good moments screen
        When I add a good moment with a unique description and a photo
        Then I should be on the Memory Book main screen
    # Ensure you stay on the Good moments screen for the next tests

    @smoke
    Scenario: Try to add good moment without photo
        When I enter a description but no photo
        And I try to save the memory
        Then I should be on the Memory Book main screen

    @smoke
    Scenario: Try to add good moment without description
        When I select a photo but leave the description empty
        And I try to save the memory
        Then I should be on the Memory Book main screen

    @smoke
    Scenario: Try to add good moment without both
        When I try to save the memory without any data
        Then the button should stay disabled
        And I go back to the Memory Book main screen
