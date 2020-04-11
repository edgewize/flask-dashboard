from templates import app

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
if __name__ == '__main__':
    app.run(port=9999, threaded=True)
