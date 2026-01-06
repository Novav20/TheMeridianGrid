# File: TheMeridianGrid/tests/features/IAM-14-Authentication.feature

Feature: User Authentication
  As a User of The Meridian Grid
  I want to securely log in and out of the platform
  To protect my data and access my personalized views.

  Scenario: Successful Login with Valid Credentials
    Given I am on the login page
    And a valid user exists with email "operator@example.com" and password "password123"
    When I enter "operator@example.com" in the email field
    And I enter "password123" in the password field
    And I click the "Log In" button
    Then I should be redirected to the "/dashboard" page
    And I should see a success message "Welcome back!"

  Scenario: Failed Login with Invalid Credentials
    Given I am on the login page
    And a valid user exists with email "operator@example.com" and password "password123"
    When I enter "wrongpassword" in the password field
    And I enter "wrongpassword" in the password field
    And I click the "Log In" button
    Then I should remain on the login page
    And I should see an error message "Invalid email or password."

  Scenario: User Logout
    Given I am logged in as a valid user
    When I click the "Logout" button
    Then I should be redirected to the "/login" page
    And I should see a message "You have been logged out."
