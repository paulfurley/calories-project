"use strict";

var LoginAlertSection = React.createClass({
  handleClick: function() {
    this.props.clearLoginAlert();
  },

  render: function() {
    if(null != this.props.loginAlert) {

      if(null != this.props.loginAlert.json) {
        var preSection = (<pre>{this.props.loginAlert.json}</pre>);
      } else {
        var preSection = (<div />);
      }

      return (
        <div className="alert alert-danger" role="alert"
             onClick={this.handleClick} >
          <i className="fa fa-times pull-right"></i>
          <h4><b>{this.props.loginAlert.text}</b></h4>

          {preSection}
        </div>
      );
    }
    else {
      return (<div />);
    }
  }
});

var LoginSection = React.createClass({
  handleLogin: function(e) {
    var username = this.refs.usernameInput.getDOMNode().value;
    var password = this.refs.passwordInput.getDOMNode().value;

    this.props.attemptLogin(username, password);
  },

  handleCreateUser: function(e) {
    var username = this.refs.usernameInput.getDOMNode().value;
    var password = this.refs.passwordInput.getDOMNode().value;

    this.props.attemptCreateUser(username, password);
  },

  suppressSubmit: function(e) {
    e.preventDefault();
  },

  render: function() {
    return (
      <div className="container">

        <Navbar />
        <LoginAlertSection loginAlert={this.props.loginAlert}
                           clearLoginAlert={this.props.clearLoginAlert} />

        <h1>Log in or Sign Up</h1>

        <form className="form-horizontal" onSubmit={this.suppressSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput" className="col-sm-2 control-label">Username</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="usernameInput"
                     ref="usernameInput"  placeholder="Username" autoFocus={true} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="passwordInput"
                     ref="passwordInput"  placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.handleLogin}
                      className="btn btn-default">Sign in</button>
              <button onClick={this.handleCreateUser}
                      className="btn btn-default">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});


var ConfigSection = React.createClass({

  handleChangeCalories: function(event) {
    this.props.updateExpectedDailyCalories(this.refs.expectedDailyCaloriesInput.getDOMNode().value);
  },

  handleChangeDateTime: function(event) {
    this.props.updateDateTimeFilters({
      fromDate: this.refs.fromDateInput.getDOMNode().value,
      toDate: this.refs.toDateInput.getDOMNode().value,
      fromTime: this.refs.fromTimeInput.getDOMNode().value,
      toTime: this.refs.toTimeInput.getDOMNode().value
    });
  },

  suppressSubmit: function(e) {
    e.preventDefault();
  },

  render: function() {

    return (
      <div className="container">
        <Navbar username={this.props.username} logout={this.props.logout}/>

        <div className="row">
          <div className="col-md-12">
            <h2>Expected daily calories</h2>
            <form className="form-inline" onSubmit={this.suppressSubmit}>
              <div className="form-group">
                <label className="sr-only" htmlFor="expectedDailyCalories">From date</label>
                <input type="number" className="form-control"
                       step={CalorieCounter.CALORIES_INCREMENT}
                       min={CalorieCounter.CALORIES_MINIMUM}
                       max={CalorieCounter.CALORIES_MAXIMUM}
                       id="expectedDailyCalories"
                       ref="expectedDailyCaloriesInput"
                       value={this.props.expectedDailyCalories}
                       onChange={this.handleChangeCalories} ></input>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2>Filter Date</h2>
            <form className="form-inline">
              <div className="form-group">
                <label className="sr-only" htmlFor="fromDateInput">From date</label>
                <input type="date" className="form-control" id="fromDateInput"
                       ref="fromDateInput"
                       value={this.props.fromDate}
                       onChange={this.handleChangeDateTime} ></input>
              </div>
              <div className="form-group">
                <label className="sr-only" htmlFor="toDateInput">To date</label>
                <input type="date" className="form-control" id="toDateInput"
                       ref="toDateInput"
                       value={this.props.toDate}
                       onChange={this.handleChangeDateTime}></input>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Filter Time</h2>
            <form className="form-inline">
              <div className="form-group">
                <label className="sr-only" htmlFor="fromTimeInput">From time</label>
                <input type="time" className="form-control" id="fromTimeInput"
                       ref="fromTimeInput"
                       value={this.props.fromTime}
                       onChange={this.handleChangeDateTime} ></input>
              </div>
              <div className="form-group">
                <label className="sr-only" htmlFor="toTimeInput">To time</label>
                <input type="time" className="form-control" id="toTimeInput"
                       ref="toTimeInput"
                       value={this.props.toTime}
                       onChange={this.handleChangeDateTime}></input>
              </div>
            </form>
          </div>
        </div>

      </div>
      );
  }
});

var Navbar = React.createClass({
  handleClickLogout: function() {
    this.props.logout();
  },


  render: function() {
    if(null != this.props.username) {
      var userText = (
        <a onClick={this.handleClickLogout}>
          Hello, {this.props.username} (logout)
        </a>
      );
    } else {
      var userText = (<span />);
    }

    return (

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <span className="navbar-brand">Calorie Counter</span>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="about.html">About</a></li>
              <li><a href="mailto:paul@paulfurley.com">Contact</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>{userText}</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});


var DayTitle = React.createClass({
  render: function() {
    if(this.props.totalCalories <= this.props.expectedDailyCalories) {
      var colourClass = "highlight-green";
    }
    else {
      var colourClass = "highlight-red";
    }

    return (
        <h2>{this.props.date} <span className={"small " + colourClass}> total calories: {this.props.totalCalories}</span></h2>
      );
  }
});

var MealRow = React.createClass({
  handleClickDelete: function() {
    this.props.deleteMealId(this.props.id);
  },

  handleChange: function() {
    // Change locally, but don't update server until focus is lost on an
    // element (blur)

    this.props.updateMealId(this.props.id, this.getMealData(), false);
  },

  handleBlur: function() {
    this.props.updateMealId(this.props.id, this.getMealData(), true);
  },

  getMealData: function() {
    return {
      id: this.props.id,
      date: this.props.date,
      time: this.refs.mealTimeInput.getDOMNode().value,
      description: this.refs.mealDescriptionInput.getDOMNode().value,
      calories: parseInt(this.refs.mealCaloriesInput.getDOMNode().value)
    };
  },

  render: function() {
    return (
      <tr>
        <td>
          <input className="stealth-input"
                 type="time"
                 value={this.props.time}
                 onChange={this.handleChange}
                 onBlur={this.handleBlur}
                 ref='mealTimeInput' />
        </td>
        <td>
          <input className="stealth-input"
                 type="description"
                 value={this.props.description}
                 onChange={this.handleChange}
                 onBlur={this.handleBlur}
                 ref='mealDescriptionInput' />
        </td>
        <td>
          <input className="stealth-input"
                 type="number"
                 step={CalorieCounter.CALORIES_INCREMENT}
                 min={CalorieCounter.CALORIES_MINIMUM}
                 max={CalorieCounter.CALORIES_MAXIMUM}
                 value={this.props.calories}
                 onChange={this.handleChange}
                 onBlur={this.handleBlur}
                 ref='mealCaloriesInput' />
        </td>

        <td><i className="fa fa-times" onClick={this.handleClickDelete}></i></td>
      </tr>
    );
  }
});

var MealsTable = React.createClass({
  render: function() {
    var mealRows = [];
    this.props.meals.forEach(function(meal) {
      mealRows.push(
        <MealRow id={meal.id}
                 date={meal.date}
                 time={meal.time}
                 description={meal.description}
                 calories={meal.calories}
                 deleteMealId={this.props.deleteMealId}
                 updateMealId={this.props.updateMealId} />);
    }.bind(this));
    return (
      <table className="table">
        <tbody>
          {mealRows}
        </tbody>
      </table>
      );
  }
});

var DaySection = React.createClass({
  render: function() {
    var totalCalories = 0;
    this.props.meals.forEach(function(meal) {
      totalCalories += meal.calories;
    });

    return (
      <div className="row">

        <div className="col-md-12">
          <DayTitle date={this.props.date}
                    totalCalories={totalCalories}
                    expectedDailyCalories={this.props.expectedDailyCalories} />
          <MealsTable meals={this.props.meals}
                      deleteMealId={this.props.deleteMealId}
                      updateMealId={this.props.updateMealId} />
        </div>
      </div>
      );
  }
});

var CalendarSection = React.createClass({
  render: function() {
    var mealsByDate = {};

    this.props.meals.forEach(function(meal) {
      var date = meal['date'];
      (mealsByDate[date] = mealsByDate[date] || []).push(meal);
    }.bind(this));

    var daySections = [];

    for(var date in mealsByDate) {
      if(!mealsByDate.hasOwnProperty(date)) {
        continue;
      }
      daySections.push(<DaySection date={date}
                                   meals={mealsByDate[date]}
                                   expectedDailyCalories={this.props.expectedDailyCalories}
                                   deleteMealId={this.props.deleteMealId}
                                   updateMealId={this.props.updateMealId} />);
    }

    return (
      <div className="container">
        {daySections}
      </div>
      );
  }
});


var AddMealSection = React.createClass({

  handleAddButton: function() {
    this.props.addMeal({
      date: this.refs.newMealDateInput.getDOMNode().value,
      time: this.refs.newMealTimeInput.getDOMNode().value,
      description: this.refs.newMealDescriptionInput.getDOMNode().value,
      calories: this.refs.newMealCaloriesInput.getDOMNode().value
    });
  },

  render: function() {
    return (
      <div className="container">
        <h3>Add a meal</h3>
        <form className="form-inline">
          <div className="form-group">
            <label className="sr-only" htmlFor="expectedDailyCalories">From date</label>
            <input type="date" className="form-control"
                   defaultValue={moment().format(CalorieCounter.DATE_FORMAT)}
                   id="newMealDateInput"
                   ref="newMealDateInput" />

            <input type="time" className="form-control"
                   defaultValue={moment().format('HH:[00]')}
                   id="newMealTimeInput"
                   ref="newMealTimeInput" />

            <input type="text" className="form-control"
                   placeholder="Enter description..."
                   defaultValue="A tasty meal"
                   id="newMealDescriptionInput"
                   ref="newMealDescriptionInput" />

            <input type="number" className="form-control"
                   defaultValue={CalorieCounter.DEFAULT_CALORIES}
                   step={CalorieCounter.CALORIES_INCREMENT}
                   min={CalorieCounter.CALORIES_MINIMUM}
                   max={CalorieCounter.CALORIES_MAXIMUM}
                   id="newMealCaloriesInput"
                   ref="newMealCaloriesInput" />

            <a className="btn btn-success" onClick={this.handleAddButton} >
              <i className="fa fa-plus"></i> Add
            </a>
          </div>
        </form>
      </div>
    );
  }
});

var CalorieCounterApp = React.createClass({
  getInitialState: function() {
    var dateNow = moment();
    var thirtyDaysAgo = moment(dateNow).subtract(30, 'days');

    return {
      token: null,
      username: null,
      loginAlert: null,
      meals: [],
      expectedDailyCalories: 2000,
      fromDate: thirtyDaysAgo.format(CalorieCounter.DATE_FORMAT),
      toDate: dateNow.format(CalorieCounter.DATE_FORMAT),
      fromTime: '00:00',
      toTime: '23:59'
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(null == prevState.token && null != this.state.token) {
      this.loadUserConfig();
      this.requestMealsForUser(null);
    }
  },

  loadUserConfig() {

    this.callApi({
        method: 'GET',
        partialUrl: '/users/' + this.state.username + '/',
        success: function(data) {
          this.setState({expectedDailyCalories: data['expected_daily_calories']})
        }.bind(this)
    });
  },

  requestMealsForUser: function(config) {

    if(null == config) {
      config = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        fromTime: this.state.fromTime,
        toTime: this.state.toTime
      };
    }

    var url = '/users/' + this.state.username + '/meals/?';
    url += $.param({
      to_date: config.toDate,
      from_date: config.fromDate,
      to_time: config.toTime,
      from_time: config.fromTime
    });

    this.callApi({
        partialUrl: url,
        success: function(data) {
          this.setState({meals: data});
        }.bind(this)
    });
  },

  attemptCreateUser: function(username, password) {

    this.callApi({
        method: 'POST',
        partialUrl: '/users/',
        data: {'username': username, 'password': password},
        success: function(data) {
          console.info('Successfully created user ' + username);
          this.attemptLogin(username, password)
        }.bind(this),
        error: this.customErrorHandler
    });
  },

  attemptLogin: function(username, password) {

    this.setState({loginAlert: null});
    this.callApi({
        method: 'POST',
        partialUrl: '/api-token-auth/',
        data: {'username': username, 'password': password},

        success: function(data) {
          console.info('Successfully logged in as ' + username);
          console.debug('User data: ', data);
          this.setState({
            username: username,
            token: data['token']
          });
        }.bind(this),
        error: this.customErrorHandler
    });
  },

  customErrorHandler: function(xhr, status, err) {
    /* This error handler formats and displays the JSON error in an alert on
     * the UI
     * */
    console.error('API error: ', xhr, status, err.toString());

    var errorText = 'Error, received ' + err.toString() + ' (HTTP ' + xhr.status + ')';
    try {
      var errorJSON = JSON.stringify(xhr.responseJSON, null, 2)
    } catch(error) {
      var errorJSON = null;
    }

    this.setState({
      loginAlert: {'text': errorText, json: errorJSON}
    });
  },

  logout: function() {
    this.setState({username: null, token: null});
  },

  updateExpectedDailyCalories: function(newExpectedDailyCalories) {
    this.setState({expectedDailyCalories: newExpectedDailyCalories});

    var data = {
      'username': this.state.username,
      'expected_daily_calories': newExpectedDailyCalories
    }

    this.callApi({
        method: 'PUT',
        partialUrl: '/users/' + this.state.username + '/',
        data: data,
        success: function(data) {
          console.debug('Successfully updated user expected_daily_calories');
          this.setState({expectedDailyCalories: data['expected_daily_calories']});
        }.bind(this)
    });
  },

  updateDateTimeFilters: function(config) {
    console.debug('updateDateTimeFilters ' + config.fromDate + ' '
                + config.toDate + ' ' + config.fromTime + ' ' + config.toTime);

    this.setState({
      fromDate: config.fromDate,
      toDate: config.toDate,
      fromTime: config.fromTime,
      toTime: config.toTime
    });

    this.requestMealsForUser(config);
  },

  addMeal: function(mealData) {
    this.callApi({
        method: 'POST',
        partialUrl: '/users/' + this.state.username + '/meals/',
        data: mealData,
        success: function(data) {
          this.requestMealsForUser(null);
        }.bind(this)
    });
  },

  deleteMealId: function(mealId) {
    console.debug('Delete meal ID ' + mealId);

    this.callApi({
        method: 'DELETE',
        partialUrl: '/users/' + this.state.username + '/meals/' + mealId + '/',
        success: function(data) {
          this.requestMealsForUser(null);
        }.bind(this)
    });
  },

  updateMealId: function(mealId, updatedMeal, saveToApi) {
    console.debug('Update meal ID ', mealId, ' ', updatedMeal);

    var newMeals = [];
    this.state.meals.forEach(function(meal) {
      if(mealId == meal.id) {
        newMeals.push(updatedMeal);
      } else {
        newMeals.push(meal);
      }
    });

    this.setState({meals: newMeals});

    if(saveToApi) {
      this.callApi({
        method: 'PUT',
        partialUrl: '/users/' + this.state.username + '/meals/' + mealId + '/',
        data: updatedMeal,
        success: function(data) {
          this.requestMealsForUser(null);
        }.bind(this)
      });
    }
  },

  clearLoginAlert: function() {
    this.setState({loginAlert: null});
  },

  callApi: function(settings) {
    settings.url = CalorieCounter.API + settings.partialUrl;

    settings.dataType = 'json',
    settings.cache = false;

    if(!settings.hasOwnProperty('error')) {
      settings.error = function(xhr, status, err) {
        console.error(settings.url, status, err.toString());
        if(401 == xhr.status) {
          console.warn('Got HTTP 401, resetting auth token');
          this.logout();
        }
      }.bind(this)
    }

   if(null != this.state.token) {
     settings.beforeSend = function(xhr) {
       xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
     }.bind(this)
   }

    console.debug('AJAX: ', settings);
    $.ajax(settings);
  },

  render: function() {

    if(null == this.state.token) {
      return (
        <div>
          <LoginSection attemptLogin={this.attemptLogin}
                        attemptCreateUser={this.attemptCreateUser}
                        loginAlert={this.state.loginAlert}
                        clearLoginAlert={this.clearLoginAlert}/>
        </div>
      )
    }

    return (
    <div>
      <ConfigSection expectedDailyCalories={this.state.expectedDailyCalories}
                     fromDate={this.state.fromDate}
                     toDate={this.state.toDate}
                     fromTime={this.state.fromTime}
                     toTime={this.state.toTime}
                     updateExpectedDailyCalories={this.updateExpectedDailyCalories}
                     updateDateTimeFilters={this.updateDateTimeFilters}
                     username={this.state.username}
                     logout={this.logout} />
      <CalendarSection meals={this.state.meals}
                       expectedDailyCalories={this.state.expectedDailyCalories}
                       deleteMealId={this.deleteMealId}
                       updateMealId={this.updateMealId} />
      <AddMealSection addMeal={this.addMeal} />
    </div>
    );
  }
});

var CalorieCounter = {
  API: 'http://localhost:8000',
  DATE_FORMAT: 'YYYY-MM-DD',
  DEFAULT_CALORIES: 500,
  CALORIES_MINIMUM: 100,
  CALORIES_MAXIMUM: 10000,
  CALORIES_INCREMENT: 100
};

React.render(
    <CalorieCounterApp />,
    document.getElementById('calorieCounterAppPlaceholder'));
