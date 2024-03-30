// This first class is for one cast member for a movie
class Cast {
  constructor(name, character) {
    this.name = name;
    this.character = character;
  }

  describe () {
    return `${this.name} plays ${this.character}.`;
  }
}

//The second class is for one movie and will have an array full of the cast members who play in that specific movie.
class Movie {
  constructor (name) {
    this.name = name;
    this.casts = [];
  }

//This method will add a cast member to the array.
  addCast(cast) {
    if (cast instanceof Cast) {
      this.casts.push(cast);
    } else {
      throw new Error(`You can only add an instance of Cast. Argument is not a cast: ${cast}`);

    }
    }

    describe () {
      return `${this.name} has ${this.casts.length} cast.`;
    }
  }

  class Menu {
    constructor() {
      this.movies = [];
      this.selectedMovie = null;
    }

//This has the listed methods that the menu will use when the user puts in the corresponding number.
    start() {
      let selection = this.showMainMenuOptions();
      while (selection != 0) {
        switch (selection) {
          case `1`: 
            this.createMovie();
            break;
          case `2`:
            this.viewMovie();
            break;
          case `3`:
            this.deleteMovie();
            break;
          case `4`:
            this.displayMovie();
            break;
          default:
            selection = 0;
          
        }
        selection = this.showMainMenuOptions();
      }
// This alert will go when the user selects 0 on the menu option.
      alert('Goodbye!');
    }

//This is the code for the how the menu will show to the user.
    showMainMenuOptions() {
      return prompt(`
      0) Exit
      1) Create New Movie
      2) View Movie
      3) Delete Movie
      4) Display All Movies
      `);
    }

//This is the method for adding cast to the movie. This will pop up after hitting 2 on the menu selection.
    showMovieMenuOptions(movieInfo) {
      return prompt(`
      0) Back
      1) Create Cast
      2) Delete Cast
      ----------------------------
      ${movieInfo}
      `);
    }

//This is the method that the menu will use when the user hits number 4 as their selection. 
//It will display all movies that have been entered.
    displayMovie() {
      let movieString = '';
      for (let i = 0; i < this.movies.length; i++) {
        movieString += i + ') ' + this.movies[i].name + '\n';
      }
      alert(movieString);
    }

//This method will add a movie to the movie array after the user selects 1 on the menu.
    createMovie() {
      let name = prompt(`Enter name for new movie:`);
      this.movies.push(new Movie(name));
    }

/*This method will ask for the user to choose what movie they want to view by asking
 for the index of the movie or the position of the movie in the movies array.
 This will pop up after the user chooses 2 on the menu. The user will then have the
 option to create a cast member for the movie or to delete a cast member. */
    viewMovie() {
      let index = prompt('Enter the index of the movie you wish to view');
      if (index > -1 && index < this.movies.length) {
        this.selectedMovie = this.movies[index];
        let description = 'Movie Name: ' + this.selectedMovie.name + '\n';
        
        for (let i = 0; i < this.selectedMovie.casts.length; i++) {
          description += i + ') ' + this.selectedMovie.casts[i].name 
          + ' - ' + this.selectedMovie.casts[i].character + '\n';
        }

        let selection = this.showMovieMenuOptions(description);
        switch (selection) {
          case '1':
            this.createCast();
            break;
          case '2':
            this.deleteCast();
        }
      }
    }
 
//This method will delete a movie from the movies array.
    deleteMovie() {
      let index = prompt('Enter the index of movie you wish to delete: ');
      if (index > -1 && index < this.movies.length) {
        this.movies.splice(index, 1);
      }
    }

//This will create the cast member if the user selects 1 after choosing to view a movie.
    createCast() {
      let name = prompt(`Enter name for new cast: `);
      let character = prompt(`Enter character for new cast: `);
      this.selectedMovie.casts.push(new Cast(name, character));
    }

//This will delete the cast member if the user selects 2 after choosing to view a movie.
    deleteCast() {
      let index = prompt(`Enter the index of the cast you wish to delete: `);
      if (index > -1 && index < this.selectedMovie.casts.length) {
        this.selectedMovie.casts.splice(index, 1);
      }
    }
  }

  let menu = new Menu();
  menu.start();