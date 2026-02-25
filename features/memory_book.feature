Feature: Memory Book Management

    @smoke
    Scenario: Create a valid memory entry with image and text
        # These only run now, at the start of the first test
        Given I am logged in and on the Home screen
        And I navigate to the Memory Book screen
        When I add a memory with a unique description and a photo
        And I should be on the Memory Book main screen
    # Ensure you stay on the Memory Book screen for the next tests

    @smoke
    Scenario: Try to add memory without photo
        When I enter a description but no photo
        And I try to save the memory
        And I should be on the Memory Book main screen


    @smoke
    Scenario: Try to add memory without description
        When I select a photo but leave the description empty
        And I try to save the memory
        And I should be on the Memory Book main screen



    @smoke
    Scenario: Try to add memory without both
        When I try to save the memory without any data
        Then the button should stay disabled
        And I go back to the Memory Book main screen