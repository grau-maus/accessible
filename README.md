# Accessible

`Accessible` is a medical records app that tracks patient and referring physician information, visits, and insurance
<br/>
User administrators can create user accounts for new staff as well as read, update, and delete other user accounts!

<br/>

## Getting Started

Follow the instructions below to have your very own `Accessible` app! (Used for development and testing purposes of course)
<br/>
Refer to [Deployment](#Deployment) for notes on how to deploy your `Accessible` project on to [Heroku](https://www.heroku.com)

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/grau-maus/accessible.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv

   ```bash
   pipenv shell
   ```

6. Migrate your database, seed your database, and run your flask app

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
6(a). If running into migration issues, delete your ``migrations`` folder, run the following commands, then redo step 6

   ```bash
   flask db init
   ```

   ```bash
   flask db migrate
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

<!-- End with an example of getting some data out of the system or using it for a little demo -->

<br/>

## Deployment

1. Create a new project on Heroku

2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"

3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)

4. Run

   ```bash
   heroku login
   ```

5. Log in to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your `Accessible` project: i.e. "https://accessible-app.herokuapp.com/"

7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit

<br/>

## Built With

[Python 3.9.4](https://www.python.org/) - Back-end
* [Flask](https://flask.palletsprojects.com/en/2.0.x/) - API routes and authentication
* [SQLAlchemy](https://www.sqlalchemy.org/) - SQL Toolkit & ORM
* [Faker](https://faker.readthedocs.io/en/master/) - For generating seeder data
***
[NodeJS](https://nodejs.org/en/) - Front-end
* [Create React App](https://github.com/facebook/create-react-app) - Used to bootstrap front-end
* [React](https://reactjs.org/) / [Redux](https://redux.js.org/) - Client-sided framework
***

<br/>

## Author

* **Josh Tupas**
   * [LinkedIn](https://www.linkedin.com/in/josh-tupas/)
