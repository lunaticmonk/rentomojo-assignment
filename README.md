# Rentomojo Assignment

> Rentomojo comment box assignment

To have an easy access, the app is deployed here: [https://rentomojo.lunaticmonk.space](https://rentomojo.lunaticmonk.space).

[![Video](https://img.youtube.com/vi/Rf6KgfpUHfg/0.jpg)](https://youtu.be/Rf6KgfpUHfg)

<!-- [Video](https://youtu.be/Rf6KgfpUHfg) -->

---

- [Requirements](#requirements)
- [Setup](#setup)

---

## Requirements

- Node.js (v8.11.3 preferable)
- MongoDB
- Yarn (`npm install -g yarn`)

### Setup

```shell
$ npm install -g yarn
$ git clone https://github.com/lunaticmonk/rentomojo-assignment.git
$ cd rentomojo-assignment
$ yarn
$ cd src/client
$ yarn
```

- Create a .env and copy the contents of .env.default in .env. Do it at both locations i.e at `/`.
- Set the `API_BASE` config in `src/client/configs/app.js`.
- Create a MongoDB user and give it `dbOwner` access to the database. Set the credentials in .env as well.
- At `/`, run: > `yarn dev`
- In another terminal, at `src/client/`, run > `yarn serve`.
- Visit `localhost:8080` to access the app.

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019
