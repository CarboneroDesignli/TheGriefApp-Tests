Feature: Login functionality

    Background:
        Given the user launches the app

    @smoke
    Scenario: User logs in and accepts notifications
        When the user logs in with valid credentials
        And accepts system permissions
        Then the user should reach the home screen

    Scenario: User logs in and denies notifications
        When the user logs in with valid credentials
        And denies system permissions
        Then the user should reach the home screen