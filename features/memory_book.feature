Feature: Memory Book Management

    Background:
        Given I am logged in and on the Home screen
        And I navigate to the Memory Book screen

    @smoke
    Scenario: Create a valid memory entry with image and text
        When I add a memory with a unique description and a photo
        Then I should see the new memory entry in the list

    @validation
    Scenario: Try to add memory without photo
        When I enter a description but no photo
        And I try to save the memory
        Then I should see the error message "Photo is required"

    @validation
    Scenario: Try to add memory without description
        When I select a photo but leave the description empty
        And I try to save the memory
        Then I should see the error message "Description is required"

    @validation
    Scenario: Try to add memory without both
        When I try to save the memory without any data
        Then I should see both errors "Photo is required" and "Description is required"