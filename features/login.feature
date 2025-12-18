Feature: Authentication

    @smoke @login
    Scenario: Successful login and permission acceptance
        Given the user launches the app
        When the user logs in with valid credentials
        And accepts system permissions
        Then the user should reach the home screen
