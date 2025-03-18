Feature: Listing members

  Background:
    Given there is an user named "User" with username "user", password "user" and role "USER"
    And the user logs in with username "user" and password "user"

  Scenario: There are members
    Given the following members exist:
      | name    | groupName |
      | Member1 | Group1    |
      | Member2 | Group1    |
      | Member3 | Group2    |
      | Member4 | Group2    |
    When the user requests all members
    Then the response status should be 200
    And the response body should be:
      | id | name    | groupId | disabled | group                                          |
      |  1 | Member1 |       1 | false    | {"name": "Group1", "id": 1, "disabled": false} |
      |  2 | Member2 |       1 | false    | {"name": "Group1", "id": 1, "disabled": false} |
      |  3 | Member3 |       2 | false    | {"name": "Group2", "id": 2, "disabled": false} |
      |  4 | Member4 |       2 | false    | {"name": "Group2", "id": 2, "disabled": false} |
