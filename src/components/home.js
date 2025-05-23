import React  from "react";

function Home() {
    // const [searchType, setSearchType] = useState("candidate");
    // const [postalCode, setPostalCode] = useState("");

    // const handleSearch = () => {
    //     alert(`Searching for ${searchType} in postal code: ${postalCode}`);
    // };
    return (
        <>
                <div class="new-styling landing-header">
  <div class="new-styling landing-header__container">
    <div class="new-styling relative landing-header__picture">
      <div class="new-styling landing-header__picture-cover">
        
      </div>
</div>
    <div class="new-styling flex items-center landing-header__content-col mb-48 xs-mb-0">
      <div class="new-styling relative landing-header__content mt-48 xs-mt-8">
          <h1>Senior care for every&nbsp;budget</h1>
<h2>Stay at home longer. Thanks to everyday help &amp; care from 20.- per hour</h2>

          <form class="new-styling landing-header-form js-home-page-cta-form gtm-home-page-cta-form" id="search_form" data-module="HomepageSearchForm" data-role="Provider" action="/en/providers/search" accept-charset="UTF-8" method="post">
          <input type="hidden" name="authenticity_token" value="9cjrL1oc0MlUgnOhVTSIIOhgn3PpjJFaq0TiTMz8b2LXldqIdbiOuoUKIFDVtFrmCvTEc6nmPcpNNfp-5noXuw" autocomplete="off" />
  <div class="new-styling landing-header-form__radio-group">

    <div class="new-styling no-padding radio no-border-bottom">
      <input class="radio__input" data-role="Provider" type="radio" value="providers" checked="checked" name="q[role]" id="q_role_providers" />
      <label class="radio__label" for="q_role_providers">
        <span class="radio__button"></span>
        <span class="new-styling text-default lh-font radio__text">
          I am looking for <strong>senior care</strong>
        </span>
</label>    </div>

    <div class="new-styling no-padding radio no-border-bottom">
      <input class="radio__input" data-role="Consumer" type="radio" value="jobs" name="q[role]" id="q_role_jobs" />
      <label class="radio__label" for="q_role_jobs">
        <span class="radio__button"></span>
        <span class="new-styling text-default lh-font radio__text">
          I'm looking for a <strong>job</strong>
        </span>
</label>    </div>
  </div>
  <div class="new-styling mb-16">
    <div class="new-styling input-field new-styling autocomplete-component" data-onready="LemonFrog.InputField.init(this)" data-onvisible="LemonFrog.InputField.initDimensions(this)">
  

  <div class="new-styling input-field__main-content">
    <div class="new-styling input-field__box">
        <div class="new-styling input-field__outline">
          <div class="new-styling input-field__outline-start"></div>
          <div class="new-styling input-field__outline-gap">
            <div class="new-styling input-field__outline-label" aria-hidden="true"><span>City or postal code</span></div>          </div>
          <div class="new-styling input-field__outline-end"></div>
        </div>

      <div class="new-styling input-field__extra-content inner prepend">            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" class="new-styling input-field__icon fill-primary"><path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="#CACDCF"></path></svg>

</div>
      <div class="new-styling input-field__control-wrapper">
        <label class="new-styling input-field__label" >City or postal code</label>
        <input class="new-styling input-field__control ui-autocomplete-input" type="text" data-module="AutocompleteFieldComponent" data-autocomplete-source="place" data-not-found-message="Nothing found" autocomplete="off" name="q[place]" id="q_place" />
</div>      <div class="new-styling input-field__extra-content inner append">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="new-styling size-24 autocomplete-component__loading-icon" style={{animation: ".8s linear 0s infinite rotate-360;"}}>
  <path d="M12 20V22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12H4C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20Z" fill="#999999"></path>
</svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="new-styling size-24 clickable autocomplete-component__clear-icon ">
  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"></path>
</svg>
</div>
<ul id="ui-id-1" tabindex="0" class="ui-widget ui-widget-content ui-autocomplete ui-front ui-menu new-styling pa-8 rounded-4 elevation-50" style={{display: "none;"}}></ul></div>
    
  </div>

  
</div>  </div>

  <input type="submit" name="commit" value="Search now" class="new-styling btn btn-gradient btn-h-56 sm-btn-h-48 text-btn-20 new-styling landing-header-form__submit-btn" data-disable-with="Please wait..." />

  <input type="hidden" name="search_referrer" id="search_referrer" value="HomepageMain" autocomplete="off" />
</form>

          <div class="new-styling flex-centered landing-header-review">
  <span class="new-styling text-h5 fw-bold lh-150 sm-text-h5 mr-12">
    <span class="new-styling landing-header-review__title hidden-lg">Avg. rating</span>
    <span class="new-styling landing-header-review__title hidden-sm hidden-md hidden-xs">Average rating</span>
  </span>

  <div class="new-styling flex-centered landing-header-review__stars">
    <div class="new-styling flex stars-container">
    <div class="new-styling relative star-container" style={{height: "26px", width: '26px'}}>
      <div class="new-styling absolute full-width full-height star-border filling"></div>

      <div class="new-styling absolute full-width full-height star" style={{background: "linear-gradient(90deg, #FFDD2C 75%, transparent 75%)"}}></div>
</div>    <div class="new-styling relative star-container" style={{height: "26px", width: "26px;"}}>
      <div class="new-styling absolute full-width full-height star-border filling"></div>

      <div class="new-styling absolute full-width full-height star" style={{background: "linear-gradient(90deg, #FFDD2C 75%, transparent 75%)"}}></div>
</div>    <div class="new-styling relative star-container" style={{height: '26px', width: '26px'}}>
      <div class="new-styling absolute full-width full-height star-border filling"></div>

      <div class="new-styling absolute full-width full-height star" style={{background: "linear-gradient(90deg, #FFDD2C 75%, transparent 75%)"}}></div>
</div>    <div class="new-styling relative star-container" style={{height: "26px", width: "26px;"}}>
      <div class="new-styling absolute full-width full-height star-border filling"></div>

      <div class="new-styling absolute full-width full-height star" style={{background: "linear-gradient(90deg, #FFDD2C 75%, transparent 75%);"}}></div>
</div>    <div class="new-styling relative star-container" style={{height: "26px", width: "26px"}}>
      <div class="new-styling absolute full-width full-height star-border filling"></div>

      <div class="new-styling absolute full-width full-height star" style={{background: "linear-gradient(90deg, #FFDD2C 54%, transparent 54%)"}}></div>
</div></div>
  </div>

  <div>
    <span class="new-styling color-black text-h3 lh-font sm-lh-font fw-bold landing-header-review__average">4.6</span>
    <span class="new-styling inline-block color-black text-btn-14 lh-font landing-header-review__count">
      <span>91 reviews</span>
    </span>
  </div>
</div>

      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Home;