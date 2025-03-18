Feature: Products

  Background:
    Given there is an user named "User" with username "user", password "user" and role "USER"
    And the user logs in with username "user" and password "user"

  Scenario: An user attempts to list products
    Given the following products exist:
      | name     |
      | Product1 |
      | Product2 |
      | Product3 |
    When the user requests all products
    Then the response body should be an array containing:
      | name     |
      | Product1 |
      | Product2 |
      | Product3 |
