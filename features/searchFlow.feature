Feature: Search flow

  Scenario: System should prevent customers from searching for impossible trip
    Given User go to MarsAir page
    When User select "July" for departing value
    And User select "December" for returning value
    And User click on "Search"
    Then User should able to see "Unfortunately, this schedule is not possible. Please try again."

  Scenario: System should inform user for no more seats available
    Given User go to MarsAir page
    When User select "December (two years from now)" for departing value
    And User select "December (two years from now)" for returning value
    And User click on "Search"
    Then User should able to see "Sorry, there are no more seats available."

  Scenario: Page should be reset by default after clicking on MarsAir logo
    Given User go to MarsAir page
    When User select "December (two years from now)" for departing value
    And User select "December (two years from now)" for returning value
    And User click on "MarsAir"
    Then Departing value and returning value should be "Select"
    And Promotional code is empty

