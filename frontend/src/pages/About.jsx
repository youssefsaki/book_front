import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
      <p className="text-xl text-gray-700 mb-4">
        Welcome to BookFinder, a platform designed to enhance your reading
        experience. We aim to provide personalized book recommendations,
        detailed book information, and insightful reviews from other readers.
        Whether you're looking to discover new books or track your reading
        habits, our app is here to guide you every step of the way.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-center">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-4">
        At BookFinder, our mission is to make reading more enjoyable and
        accessible by offering tailored book recommendations based on your
        preferences and interests. We use the latest AI technology to suggest
        books that suit your reading habits, ensuring that you always have a
        great book to dive into.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-center">How It Works</h2>
      <p className="text-lg text-gray-700 mb-4">
        The app allows you to browse a wide selection of books, rate and review
        the ones you've read, and get personalized suggestions. Our AI-powered
        recommendation system analyzes your ratings and preferences to suggest
        books that are likely to match your interests. Additionally, you can
        track your reading progress and save your favorite books.
      </p>
      <h2 className="text-2xl font-semibold mb-2 text-center">Join Us</h2>
      <p className="text-lg text-gray-700 mb-4">
        Join our growing community of book lovers and start discovering amazing
        books today! Sign up now and begin your reading journey with BookFinder.
      </p>
    </div>
  );
};

export default About;
