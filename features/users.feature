Feature: Creating an user
    Admins should be able to create users

  Scenario: An unauthenticated user attempts to create an user
    Given the user is not logged in
    When the user creates an user named "User" with username "user", password "user" and role "USER"
    Then the response status should be 401

  Scenario Outline: An <role> user attempts to create an user
    Given there is an user named "<name>" with username "<username>", password "<password>" and role "<role>"
    And the user logs in with username "<username>" and password "<password>"
    When the user creates an user named "User" with username "user", password "user" and role "USER"
    Then the response status should be <status>

    Examples:
      | name  | username | password | role  | status |
      | Admin | admin    | admin    | ADMIN |    201 |
      | User  | user     | user     | USER  |    403 |
