import { DetailedHTMLProps, ImgHTMLAttributes, useMemo } from 'react';
import { Attacker, KillMail, Victim } from 'models/killmail';


export const useKillUtils = (kill: KillMail) => {
  const onAffiliationLoadError = (e) => {
    e.target.src = 'https://images.evetech.net/corporations/1/logo?size=64';
  }

  const getAffiliationProps = (person: Victim | Attacker): DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> => {
    let type, id;

    if (person.alliance_id) {
      type = 'alliances';
      id = person.alliance_id;
    } else {
      type = 'corporations';
      id = person.corporation_id;
    }

    return type && id && {
      alt: kill?.names?.[id]?.name || '',
      src: `https://images.evetech.net/${type}/${id}/logo?size=64`,
      onError: onAffiliationLoadError,
    };
  }

  const victim = useMemo(
    () => kill?.victim && getAffiliationProps(kill.victim),
    [kill]
  );

  const killingBlow = useMemo(() => {
    if (!kill?.attackers) {
      return null;
    }

    for (let attacker of kill.attackers) {
      if (attacker.final_blow) {
        return getAffiliationProps(attacker);
      }
    }
  }, [kill]);

  return {
    victim,
    killingBlow,
    getAffiliationProps,
  }
}