# ACRI-ST Home Assignment

## What We Are Looking For

The objective of this assignment is to evaluate your global competencies with regards to design and developement in the scope of a sample web platform.

There is no "correct answer". If you find that you don't have time to implement everything you want you may return your partial solution and document how you would continue the exercise.

The result of this assignement will be used as a point of discussion in a subsequent possible interview.


## The Story

The year is 2025 and Sophia-Antipolis has a waste problem. To handle this problem, the three main municipalities: Biot, Valbonne and Antibes have invested in WASTE (Waste Acquisition STorage and Elimination) drones. Whenever someone encounters waste in the Sophipolitan area, they can use their smart phone and report it using the WASTE App.

However operating these drones is expensive; it is only worth it for the drones to get activated when a given minimum number of clean up tasks in its zone of operation are required.

The city councils also want to make sure their investement was worth it, as such they would like to access some statistics on the operation of their WASTE drones.


## Deliverables

The backend solution should be composed of two components:


### The API

The first component is a simple API to expose information about the Zones and Reports, as well as submitting waste reports. Do not focus on authentication for this excercise, rather focus on the functionality.

The following endpoints should be implemented:

  * **Zones:** Show general information and statistics regarding zones
    * GET `/zones`
    * GET `/zones/{zone_id}`

    The basic information, encoded as JSON, for zone should include:
    ```
    {
        "name": "...",
        "geometry": <GeoJSON Polygon>,
        "stats": { ... } 
    }
    ```

  * Reports: Used to retrieve information about reports, and to submit new ones
    * GET `/reports`: Retrieve a list of waste reports
    * POST `/reports`: submit a new waste report
    * GET `/reports/{report_id}`: Retrieve information specific to a given waste reports

  
    A user submitted waste report should include at minimum:
  
    ```
    {
      "waste_type": ...,
      "location": <GeoJSON Point>
    }
    ```


### The Backend Service

The second component is a backend service responsible for gathering waste reports, dispatching the drones as necessary when the number of uncleaned waster for a given zone goes above the given threshold, and updating the computed per zone statistics (number of drone cleaups, number of reports, ...). As such it must simulate drone clean ups.


## Mandated Technologies

  * **Language:** NodeJS / TypeScript Or Python
  * **Messaging:** Kafka
  * **Database:** Postgres (You may use PostGIS for geographical features, or the native Postgres types)


## Evaluation Criteria

  * **Code Quality**: We value code that is written for other developers to read and understand above all. Demonstrating mastery through clear, idiomatic (for the language) code, relevant comments, and the use of existing libraries is prefered to _clever_ code and re-inventing the wheel.

  * **Testing practicality**: Provide a practical indication of how the code would be tested and validated (sample unit test for example). There is no need to achieve 100% test coverage (in many cases being impractical anyway).

  * **Automation**: Multi-step instructions are tedious and error prone. Enabling easy development, testing and integration into CI/CD pipelines should be target to keep in sight.

  * **Attribution**: Any significant or non-trivial portions of code copied from online resources (Blogs, Gists, Stack Overflow, ...) should be adequately referenced. Credit where credit is due.

  * **"Ready-to-go"**: While it is not expected that a fully production-ready solution be created, it is a good idea to set it up as if it were, for example by using idiomatic packaging and build systems, ready to be used by third parties.