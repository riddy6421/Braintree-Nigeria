package matimatiks.matimatiks;


import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.text.style.ForegroundColorSpan;
import android.util.Log;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.CallbackManager;
import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.ErrorCodes;
import com.firebase.ui.auth.IdpResponse;
import com.google.android.gms.appinvite.AppInvite;
import com.google.android.gms.appinvite.AppInviteInvitation;
import com.google.android.gms.appinvite.AppInviteInvitationResult;
import com.google.android.gms.appinvite.AppInviteReferral;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.Arrays;

/**
 * Created by ridwan on 8/12/2016.
 */
public class Mainactivity extends AppCompatActivity implements GoogleApiClient.OnConnectionFailedListener{

    private FirebaseAuth firebaseAuth;
    private int RC_SIGN_IN = 0;
    private TextView button2;
    private DatabaseReference databaseReference;
    private CallbackManager callbackManager;
    private static final String TAG = "TAG";
    private static final int REQUEST_INVITE = 0;
    private GoogleApiClient mGoogleApiClient;



    /**
     * @param savedInstanceState
     */
    @SuppressLint("ResourceAsColor")
    protected void onCreate(Bundle savedInstanceState) {
        getIntent();
        super.onCreate(savedInstanceState);
        firebaseAuth = FirebaseAuth.getInstance();
        setContentView(R.layout.activity_main);

        /* Adding the status bar for the activity**/
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.company_color));
        }


        databaseReference = FirebaseDatabase.getInstance().getReference();

        callbackManager = CallbackManager.Factory.create();

        // Create an auto-managed GoogleApiClient with access to App Invites.
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addApi(AppInvite.API)
                .enableAutoManage(this, this)
                .build();


        //Sign out user if user-signed in
        if (firebaseAuth.getCurrentUser() != null)
            firebaseAuth.signOut();


        // Check for App Invite invitations and launch deep-link activity if possible.
        // Requires that an Activity is registered in AndroidManifest.xml to handle
        // deep-link URLs.
        AppInvite.AppInviteApi.getInvitation(mGoogleApiClient, this, true)
                .setResultCallback(
                        new ResultCallback<AppInviteInvitationResult>() {
                            @Override
                            public void onResult(AppInviteInvitationResult result) {
                                Log.d(TAG, "getInvitation:onResult:" + result.getStatus());
                                if (result.getStatus().isSuccess()) {
                                    // Extract information from the intent
                                    Intent intent = result.getInvitationIntent();
                                    String deepLink = AppInviteReferral.getDeepLink(intent);
                                    String invitationId = AppInviteReferral.getInvitationId(intent);

                                    Log.e("Tag", deepLink);
                                    Log.e("Tag", invitationId);
                                }
                            }
                        });

        button2 = findViewById(R.id.login);
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                startActivityForResult(AuthUI.getInstance().createSignInIntentBuilder().setIsSmartLockEnabled(true).setTheme(R.style.AppTheme).setLogo(R.mipmap.img_launch)
                        .setAllowNewEmailAccounts(true).setAvailableProviders(Arrays.asList(new AuthUI.IdpConfig.Builder(AuthUI.EMAIL_PROVIDER).build(),
                                new AuthUI.IdpConfig.Builder(AuthUI.GOOGLE_PROVIDER).build(),
                                new AuthUI.IdpConfig.Builder(AuthUI.FACEBOOK_PROVIDER).build(),
                                new AuthUI.IdpConfig.Builder(AuthUI.TWITTER_PROVIDER).build())).build(),RC_SIGN_IN);


            }
        });

       String policy;
       TextView pol = findViewById(R.id.policy);

       policy = "By Logging in to Matimatiks, you agree with our Privacy Policy and Terms of Service";

       SpannableString sp = new SpannableString(policy);


        sp.setSpan(new ClickableSpan() {
                       @Override
                       public void updateDrawState(TextPaint ds) {
                           super.updateDrawState(ds);
                         //  ds.setColor(Color.BLUE);
                          // ds.setUnderlineText(true);
                       }

                       @Override
                       public void onClick(View widget) {

                       }
                   }
                ,(policy.indexOf("Privacy")),(policy.indexOf("Privacy")+14),Spanned.SPAN_INCLUSIVE_INCLUSIVE);


        sp.setSpan(new ClickableSpan() {
            @Override
            public void updateDrawState(TextPaint ds) {
                super.updateDrawState(ds);
               // ds.setColor(Color.BLUE);
                //ds.setUnderlineText(true);
            }

            @Override
            public void onClick(View widget) {

            }
        }
        , (policy.indexOf("Terms")),(policy.length()),Spanned.SPAN_INCLUSIVE_INCLUSIVE);

        pol.setText(sp);
        pol.setMovementMethod(LinkMovementMethod.getInstance());
        pol.setHighlightColor(Color.TRANSPARENT);

    }

    /**
     *
     */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    /**
     * @param requestCode
     * @param resultCode
     * @param data
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode, resultCode, data);

        View view = findViewById(R.id.snackbar_layout);

        if (requestCode == RC_SIGN_IN) {
            IdpResponse response = IdpResponse.fromResultIntent(data);
            if (resultCode == RESULT_OK) {
                if (firebaseAuth.getCurrentUser() != null) {
                    createnewUser(firebaseAuth.getCurrentUser().getUid(), firebaseAuth.getCurrentUser().getDisplayName(), firebaseAuth.getCurrentUser().getEmail());
                    Intent intent = new Intent(Mainactivity.this, Login.class);
                    startActivity(intent);
                }

            } else {

                if (response == null) {
                    // User pressed back button
                    Snackbar.make(view,"SIGN IN CANCELLED", Snackbar.LENGTH_LONG).show();
                    return;
                }

                if (response.getErrorCode() == ErrorCodes.NO_NETWORK) {
                    Snackbar.make(view,"NO INTERNET CONNECTION", Snackbar.LENGTH_LONG).show();
                    return;
                }

                if (response.getErrorCode() == ErrorCodes.UNKNOWN_ERROR) {
                    Snackbar.make(view,"UNKNOWN ERROR", Snackbar.LENGTH_LONG).show();
                    return;
                }
            }

            Snackbar.make(view,"UNKNOWN SIGN IN", Snackbar.LENGTH_LONG).show();
        }

                System.out.println("Couldn't log in");
            }




    /**
     * @param connectionResult
     */
    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
        Log.d(TAG, "onConnectionFailed:" + connectionResult);
        showMessage(getString(R.string.google_play_services_error));
    }

    private void onInviteClicked() {
        Intent intent = new AppInviteInvitation.IntentBuilder(getString(R.string.invitation_title))
                .setMessage(getString(R.string.invitation_message))
                .setDeepLink(Uri.parse(getString(R.string.invitation_deep_link)))
                .setCustomImage(Uri.parse(getString(R.string.invitation_custom_image)))
                .setCallToActionText(getString(R.string.invitation_cta))
                .build();
        startActivityForResult(intent, REQUEST_INVITE);
    }

    /**
     * @param msg
     */
    private void showMessage(String msg) {
        ViewGroup container = findViewById(R.id.snackbar_layout);
        Snackbar.make(container, msg, Snackbar.LENGTH_SHORT).show();
    }


    public class User {

      public  String Name;
       public String email;

      public  User() {
            // Default constructor required for calls to DataSnapshot.getValue(User.class)
        }

        public User(String Name, String email) {
            this.Name = Name;
            this.email = email;
        }

    }


    /**
     *
     */
    private void createnewUser(final String userId, final String name, final String mail) {
        final View view = findViewById(R.id.snackbar_layout);

        databaseReference.child("users").child(userId).child("Name").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(final DataSnapshot dataSnapshot) {
                if (!(dataSnapshot.exists())) {
                    databaseReference.child("users").child(userId).child("Name").setValue(name).addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            Snackbar.make(view,"Account Created", Snackbar.LENGTH_LONG).show();

                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {

                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });

                    databaseReference.child("users").child(userId).child("Email").setValue(mail).addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            Snackbar.make(view,"Account Created", Snackbar.LENGTH_LONG).show();

                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {

                            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
                } else
                    Snackbar.make(view,"Logged In", Snackbar.LENGTH_LONG).show();

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

                Toast.makeText(getApplicationContext(), databaseError.getMessage(), Toast.LENGTH_LONG).show();

            }
        });


    }

}
