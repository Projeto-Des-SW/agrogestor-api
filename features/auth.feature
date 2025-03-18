Feature: Logging in
    The user should be able to authenticate using username and password

  Background:
    Given there is an user named "User" with username "user", password "user" and role "USER"

  Scenario: An user logs in
    When the user logs in with username "user" and password "user"
    Then the response status should be 201
    And the response body should include "access_token"

  Scenario: An user attempts to log in with the wrong credentials
    When the user logs in with username "user" and password "password"
    Then the response status should be 401
