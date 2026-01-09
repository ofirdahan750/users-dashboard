import {
  USER_CARD_COMPANY_LABEL,
  USER_CARD_EMAIL_LABEL,
  USER_CARD_PHONE_LABEL,
  USER_CARD_ADDRESS_LABEL,
  USER_CARD_WEBSITE_LABEL,
} from "../../../constants/texts";
import type { UsersListItemProps } from "../../../types/userProps";
import { formatEmail, formatUrl } from "../../../utils/textUtils";

export const UsersListItem = ({ user, index }: UsersListItemProps) => {
  return (
    <article className="user-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <header className="user-card__header">
        <h2 className="user-card__title">{user.name}</h2>
        <p className="user-card__subtitle">@{user.username}</p>
      </header>

      <div className="user-card__details">
        <div className="user-card__detail-row">
          <span className="user-card__detail-label">{USER_CARD_EMAIL_LABEL}</span>
          <span className="user-card__detail-value" title={user.email}>
            {formatEmail(user.email)}
          </span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">{USER_CARD_PHONE_LABEL}</span>
          <span className="user-card__detail-value">{user.phone}</span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">{USER_CARD_ADDRESS_LABEL}</span>
          <span className="user-card__detail-value">
            {user.address.street}, {user.address.suite}, {user.address.city} {user.address.zipcode}
          </span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">{USER_CARD_COMPANY_LABEL}</span>
          <span className="user-card__detail-value">{user.company.name}</span>
        </div>

        <div className="user-card__detail-row">
          <span className="user-card__detail-label">{USER_CARD_WEBSITE_LABEL}</span>
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

