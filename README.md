# Accessible

`Accessible` is a medical records app that tracks patient and referring physician information, visits, and insurance
<br/>
User administrators can create user accounts for new staff as well as read, update, and delete other user accounts!

<br/>

## Getting Started

Follow the instructions below to have your very own `Accessible` app! (Used for development and testing purposes of course)
<br/>
Refer to [Deployment](#Deployment) for notes on how to deploy your `Accessible` project on to [Fly.io](https://fly.io/)

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

   - If running into migration issues, delete your `migrations` folder, run the following commands, then redo step 6

     ```bash
     flask db init
     ```

     ```bash
     flask db migrate
     ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv requirements > requirements.txt
```

_ALSO IMPORTANT!_
`psycopg2-binary` MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

<!-- End with an example of getting some data out of the system or using it for a little demo -->

<br/>

## Deployment

1.  Before you deploy, don't forget to run the following command in order to
    ensure that your production environment has all of your up-to-date
    dependencies. You only have to run this command when you have installed new
    Python packages since your last deployment, but if you aren't sure, it won't
    hurt to run it again.

    ```bash
    pipenv requirements > requirements.txt
    ```

2.  Install the [flyctl CLI](https://fly.io/docs/hands-on/install-flyctl/)

3.  Run:

    ```bash
    fly auth login
    ```

4.  Launch your app:

    ```bash
    fly launch
    ```

5.  Type in your app name (or leave blank to generate a random app name)

6.  Select a region for deployment (preferably the nearest location unless a majority of your users are based in another region)

7.  Select `y` if the CLI asks: `would you like to set up a Postgresql database?`

8.  Select `N` if the CLI asks: `would you like to set up an Upstash Redis database?`

9.  Select `N` if the CLI asks: `would you like to deploy?`

10. Before deploying, set up your secret key by running:

    ```bash
    fly secrets set SECRET_KEY=<your secret key>
    ```

11. Deploy your app:

    ```bash
    fly deploy
    ```

12. SSH into your app:

    ```bash
    fly ssh console
    ```

13. Navigate into your app folder:

    ```bash
    cd var/www/
    ```

14. Set up your database

    ```bash
    flask db upgrade
    flask seed all
    ```

15. profit

<br/>

## Built With

[Python 3.9.4](https://www.python.org/) - Back-end

- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - API routes and authentication
- [SQLAlchemy](https://www.sqlalchemy.org/) - SQL Toolkit & ORM
- [Faker](https://faker.readthedocs.io/en/master/) - For generating seeder data

---

[NodeJS](https://nodejs.org/en/) - Front-end

- [Create React App](https://github.com/facebook/create-react-app) - Used to bootstrap front-end
- [React](https://reactjs.org/) / [Redux](https://redux.js.org/) - Client-sided framework

---

<br/>

## Author

- **Josh Tupas**
  - [LinkedIn](https://www.linkedin.com/in/josh-tupas/)
