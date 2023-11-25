import { useNavigate } from "react-router-dom";
import { SignOut } from "@phosphor-icons/react";

import { Button } from "../Button";
import { useAuth } from "@contexts/auth";
import Avatar from "avataaars";
import "./styles.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="grid grid-cols-profile items-center gap-3">
      <div className="relative h-16 w-16">
        <div className="relative h-16 w-16">
          <svg className="relative h-16 w-16 rounded-sm">
            <circle
              cx="28" cy="28" r="28"
              className="fill-none stroke-2 stroke-zinc-100 translate-x-1 translate-y-1 ring_circle"
            ></circle>
            <circle
              cx="28" cy="28" r="28"
              className="fill-none stroke-2 stroke-zinc-100 translate-x-1 translate-y-1 ring_circle"
            ></circle>
          </svg>
          <div className="absolute flex items-center justify-center w-full h-full top-0 left-0">
            {user && user.sexo === "True" ? (
              <Avatar
                avatarStyle="Circle"
                topType="LongHairFrida"
                accessoriesType="Blank"
                facialHairType="Blank"
                clotheType="Overall"
                clotheColor="Heather"
                eyeType="Happy"
                eyebrowType="DefaultNatural"
                mouthType="Smile"
                skinColor="Brown"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <Avatar
                avatarStyle='Circle'
                topType='ShortHairShortFlat'
                accessoriesType='Blank'
                hairColor='Platinum'
                facialHairType='MoustacheFancy'
                facialHairColor='Brown'
                clotheType='CollarSweater'
                clotheColor='PastelGreen'
                eyeType='Happy'
                eyebrowType='DefaultNatural'
                mouthType='Smile'
                skinColor='Brown'
                className="w-12 h-12 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col truncate">
        <span className="text-white text-sm font-semibold">{user?.nome}</span>
        <small className="truncate text-sm text-gray-400">
          {user && user.cargo[0].toUpperCase() + user.cargo.slice(1).toLowerCase()}
        </small>
      </div>
      <Button
        type="button"
        variant="ghost"
        onClick={() => handleSignOut()}
      >
        <SignOut className="h-5 w-5 text-gray-400" />
      </Button>
    </div>
  );
};
