FROM python:3.7
RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
    netcat \
    && apt-get -q clean



# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add requirements
COPY ./requirements.txt /usr/src/app/requirements.txt

# install requirements
RUN pip install -r requirements.txt


# add files
RUN mkdir -p /usr/src/app/example_taxi
COPY ./example_taxi /usr/src/app/example_taxi


# run server
CMD python example_taxi/manage.py runserver 0.0.0.0:8000