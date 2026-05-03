import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

type PasswordInputProps = React.ComponentProps<typeof InputGroupInput> & {
  disabled?: boolean;
};

export function PasswordInput({ disabled, className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        disabled={disabled}
        type={showPassword ? "text" : "password"}
        className={className}
      />
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
