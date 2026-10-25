"use client";

const ExploreButton = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => 'hi'}>
      <a href="#events">
        Explore events

        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 18L12.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.20866 12.0001C5.20866 12.0001 10.5788 19 12.5003 19C14.4218 19 19.792 12 19.792 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </button>
  )
}

export default ExploreButton;