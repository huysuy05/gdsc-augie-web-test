#Specifying the python image version.
FROM python:3.13.5-bookworm


# Set environment variables for virtual environment
ENV VIRTUAL_ENV=/opt/vev
RUN python -m venv ${VIRTUAL_ENV}


# Activate the virtual environment
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

#**Sets the working directory inside the container to `app`. 
#All subsequent commands will run from this directory.
WORKDIR /app

#Copies everything in our backend-server directory to the container's
# app directory. 
COPY /backend-server /app/

#Run the command when setting up the container to download all the necessary
# modules to run the program.
RUN pip install -r requirements.txt

#Tells Docker that the server will be listening at port 8000 at run time. 
EXPOSE 8000

#Default command when the image starts running. 
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]