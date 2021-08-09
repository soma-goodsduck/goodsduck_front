[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/soma-goodsduck/goodsduck_front">
    <img src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/logo.svg" alt="Logo" width="400" height="80">
  </a>

  <p align="center">
    굿즈를 모으는 덕후들을 위한 서비스
    <br />
    <a href="https://www.goods-duck.com/"><strong>goods-duck.com »</strong></a>
  </p>
</p>

<br>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setting-environment-variables">Setting Environment Variables</a></li>
      </ul> 
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/image/goodsduck_readme.png" alt="Logo" width="800" height="400">

최근 국내에는 중고거래 시장이 활성화 되었으며, 좋은 서비스를 제공하는 플랫폼들이 다수 존재합니다. 하지만, 아이돌을 덕질을 하는 팬(덕후)들을 위한 거래 플랫폼은 많지 않습니다. 이에 저희 덕스(Ducks) 팀은 덕후들을 만족시키기 위한 플랫폼을 기획하였습니다.

검증 가설은 다음과 같습니다:

- 필터링 기능을 제공하면 편한 거래 플랫폼이 될 것이고, 가격제안으로 채팅이 이어지면 시간이 줄어들 것이다.
- 투표 기능을 제공하면 유저들의 유입방안이 되고, 커뮤니티가 있으면 재밌어서 유저가 오래 머물 것이다.
- 개인화 추천 기능을 제공하면 사용자들이 우리 플랫폼을 선호하는 이유가 될 것이다.

현재 지속적으로 애자일(Agile) 방법론을 기반으로 개발을 진행하고 있습니다. 제공하는 서비스의 중심이 거래이기 때문에, 거래 기능 사이클의 완성을 1차 목표(~8월 중순)로 하고 있습니다. 추가적인 투표 및 커뮤니티 기능은 2차 목표(~9월 말), 추천 시스템 적용은 3차 목표(~10월 중순)로 계획하고 있습니다.

### Built With

- MacOS (Big Sur 11.4)
- Node.js version 14.17.1
- yarn version 1.22.10
- Visual Studio Code

<!-- GETTING STARTED -->

## Getting Started

### Installation

```sh
# If you never use React, plz install node and yarn.
# Install Node.js from https://nodejs.org/ko/download/
# Install yarn : brew install yarn

# Fork this repository to yours.
$ git clone [YOUR_REPOSITORY_URL]
$ cd goodsduck_front

# Start this project.
$ yarn
$ yarn start

```

### Setting Environment Variables

```sh
# .env
# You need to set environment varialbes
REACT_APP_FRONT_URL = https://www.goods-duck.com
REACT_APP_BACK_URL = https://api.goods-duck.com

# Firebase Project Environment
REACT_APP_FIREBASE_API_KEY =
REACT_APP_FIREBASE_AUTH_DOMAIN =
REACT_APP_FIREBASE_DATABASE_URL =
REACT_APP_FIREBASE_PROJECT_ID =
REACT_APP_FIREBASE_STORAGE_BUCKET =
REACT_APP_FIREBASE_MESSAGING_SENDER_ID =
REACT_APP_FIREBASE_APP_ID =
REACT_APP_FIREBASE_MEASUREMENT_ID =
```

<!-- CONTRIBUTING -->

## Contributing

This repository managed based on forked pull request strategy

```sh
# Fork this repository to yours.
$ git clone [YOUR_REPOSITORY_URL]
$ cd goodsduck_front

# Install npm packages and start this project.
$ npm install
$ yarn start

# (Working...)

$ git commit [...]
$ git push origin [YOUR_REPOSITORY]

# Enroll pull-request!
# in https://github.com/soma-goodsduck/goodsduck_front
```

### Commit message rules

Consider starting the commit message with an applicable emoji:

- ✨ `:sparkles:` : with `[feat]` prefix.
  - when create new feature.
- ♻️ `:recycle:` : with `[refactor]` prefix.
  - when refactor code.
- 🐛 `:bug:` : with `[fix]` prefix.
  - when fixing a bug.
- 📝`:memo:` : with `[docs]` prefix.
  - when add document.

## License

[MIT](./LICENSE)

<div align="center">

<sub><sup>Project by <a href="https://github.com/2dowon">@2dowon</a> <a href="https://github.com/Ting-Kim">@Ting-Kim</a> <a href="https://github.com/W0nee">@W0nee</a></sup></sub>

</div>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/soma-goodsduck/goodsduck_front.svg?style=for-the-badge
[contributors-url]: https://github.com/soma-goodsduck/goodsduck_front/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/soma-goodsduck/goodsduck_front.svg?style=for-the-badge
[forks-url]: https://github.com/soma-goodsduck/goodsduck_front/network/members
[stars-shield]: https://img.shields.io/github/stars/soma-goodsduck/goodsduck_front.svg?style=for-the-badge
[stars-url]: https://github.com/soma-goodsduck/goodsduck_front/stargazers
[issues-shield]: https://img.shields.io/github/issues/soma-goodsduck/goodsduck_front.svg?style=for-the-badge
[issues-url]: https://github.com/soma-goodsduck/goodsduck_front/issues
[license-shield]: https://img.shields.io/github/license/soma-goodsduck/goodsduck_front.svg?&style=for-the-badge
[license-url]: https://github.com/soma-goodsduck/goodsduck_front/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
