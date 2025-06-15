# Vocabulary Games Project

This repository contains a multi-platform vocabulary games application designed to engage kids in learning new words and improving their language skills.

## Project Structure

The project consists of three main components:

1. **Frontend (Angular)**: Web-based user interface for the vocabulary games
2. **Backend (Spring Boot)**: RESTful API services that power the games
3. **Mobile (Flutter)**: Cross-platform mobile application for iOS and Android

## Components

### Frontend (Angular)

The web frontend provides an interactive interface for users to play vocabulary games.

#### Setup Instructions

```bash
cd frontend
npm install
ng serve
```

The application will be available at `http://localhost:4200/`.

### Backend (Spring Boot)

The backend provides RESTful API services for the vocabulary games.

#### Setup Instructions

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080/`.

### Mobile (Flutter)

The mobile application allows users to play vocabulary games on iOS and Android devices.

#### Setup Instructions

```bash
cd mobile/wexl_flutter_games
flutter pub get
flutter run
```

## Development

### Prerequisites

- Node.js and npm (for Angular)
- Java 11+ and Maven (for Spring Boot)
- Flutter SDK (for mobile app)
- Android Studio or Xcode (for mobile app development)

### Getting Started

1. Clone the repository
2. Set up each component following the instructions above
3. Make your changes
4. Test your changes
5. Submit a pull request

## Features

- Various vocabulary games for different age groups
- Progress tracking
- Leaderboards
- Customizable difficulty levels

## License

[Add your license information here]