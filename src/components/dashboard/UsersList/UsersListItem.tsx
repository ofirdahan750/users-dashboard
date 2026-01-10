import {
  USER_CARD_COMPANY_LABEL,
  USER_CARD_EMAIL_LABEL,
  USER_CARD_PHONE_LABEL,
  USER_CARD_ADDRESS_LABEL,
  USER_CARD_WEBSITE_LABEL,
} from "constants";
import type { UsersListItemProps } from "types";
import { formatEmail, formatUrl } from "utils";

export const UsersListItem = ({ user, index }: UsersListItemProps) => {
  return (
    <article
      className="user-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <header className="user-card__header">
        <h2 className="user-card__title">{user.name}</h2>
        <p className="user-card__subtitle">@{user.username}</p>
      </header>

      <div className="user-card__details">
        <div className="user-card__detail-row">
          <span className="user-card__detail-label">
            {USER_CARD_EMAIL_LABEL}
          </span>
          <span className="user-card__detail-value" title={user.email}>
            {formatEmail(user.email)}
          </span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">
            {USER_CARD_PHONE_LABEL}
          </span>
          <span className="user-card__detail-value">{user.phone}</span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">
            {USER_CARD_ADDRESS_LABEL}
          </span>
          <span className="user-card__detail-value">
            {user.address.street}, {user.address.suite}, {user.address.city}{" "}
            {user.address.zipcode}
            <div className="user-card__map">
              <iframe
                width="100%"
                height="150"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(user.address.geo.lng) - 0.001},${parseFloat(user.address.geo.lat) - 0.001},${parseFloat(user.address.geo.lng) + 0.001},${parseFloat(user.address.geo.lat) + 0.001}&layer=mapnik&marker=${user.address.geo.lat},${user.address.geo.lng}`}
                title={`Map for ${user.name}`}
              />
            </div>
          </span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">
            {USER_CARD_COMPANY_LABEL}
          </span>
          <span className="user-card__detail-value">{user.company.name}</span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">
            {USER_CARD_WEBSITE_LABEL}
          </span>
          <span className="user-card__detail-value" title={user.website}>
            <a
              href={formatUrl(user.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="user-card__link"
            >
              {formatUrl(user.website)}
            </a>
          </span>
        </div>
      </div>
    </article>
  );
};
